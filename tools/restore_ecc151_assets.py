#!/usr/bin/env python3
"""Restore only the checksum-verified ECC media into its isolated public directory."""
from pathlib import Path
import argparse, hashlib, json, zipfile
p=argparse.ArgumentParser(description=__doc__);p.add_argument('archive',type=Path);a=p.parse_args()
root=Path(__file__).resolve().parents[1]
m=json.loads((root/'video/src/ecc151/assets-manifest.json').read_text())
if hashlib.sha256(a.archive.read_bytes()).hexdigest()!=m['archive_sha256']:raise SystemExit('Archive checksum differs; use the linked final source ZIP.')
dest=root/m['destination'];pending=[]
with zipfile.ZipFile(a.archive) as z:
 for f in m['files']:
  rel=Path(f['path'])
  if rel.is_absolute() or '..' in rel.parts:raise SystemExit('Invalid manifest path')
  data=z.read(m['archive_prefix']+f['path'])
  if len(data)!=f['bytes'] or hashlib.sha256(data).hexdigest()!=f['sha256']:raise SystemExit('Asset mismatch: '+f['path'])
  target=dest/rel
  if target.is_symlink():raise SystemExit('Refusing symlink target: '+f['path'])
  if target.exists() and target.read_bytes()!=data:raise SystemExit('Existing asset differs: '+f['path'])
  pending.append((target,data))
for target,data in pending:
 target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data)
print('Restored',len(pending),'verified assets to',dest)
