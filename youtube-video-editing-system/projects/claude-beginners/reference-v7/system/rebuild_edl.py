import json,math,importlib.util
from pathlib import Path
dest=Path(__file__).resolve().parents[1];p=dest/'analysis';fps=30000/1001
# Use the existing YouTube system's EDL builder, with explicitly reviewed phrase spans.
spec=importlib.util.spec_from_file_location('edl',dest/'system/build_edl.py');mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
selected=json.loads((p/'audited-selects.json').read_text()); sync=json.loads((p/'sync-final.json').read_text())
# Reviewed selects' exact word edges, to be filled after phrase/picture review.
overrides=json.loads((p/'boundary-overrides.json').read_text()) if (p/'boundary-overrides.json').exists() else {}
spans=[];labels=[]
for g in selected:
 ov=overrides.get(str(g['id']),{})
 if ov.get('discard'):continue
 a=ov.get('start',g['start']);b=ov.get('end',g['end'])
 spans.append([a,b]);labels.append(g)
hard=[]
last=0
for a,b in spans:
 if a-last>.5:hard.append({'start':last,'end':a-.20,'kind':'setup' if last==0 else 'retake-or-dead-space','reason':'Unselected retries/markers/waits between reviewed complete takes; see source disposition ledger.'})
 last=b+.28
hard.append({'start':last,'end':2364.395102,'kind':'editor-instructions','reason':'Recording-end discussion and trailing setup, after completed final CTA.'})
payload={'profile':'talking-head','source':'voice.m4a','source_fps':fps,'output_fps':fps,'source_duration_seconds':2364.395102,'source_width':1920,'source_height':1080,'pause_max':0,'head':.18,'tail':.25,'vad':spans,'hard_cuts':[]}
edit=mod.build(payload); edit['sync']=sync;edit['analysis']['hardCuts']=hard
assert len(edit['segments'])==len(labels)
for s,g in zip(edit['segments'],labels):
 s['label']=g.get('auditText',g.get('text',''))
 s['phraseId']=g['id'];s['reason']='Reviewed complete take; source order preserved'
 s['cameraStartFrame']=round((sync['cameraOffsetSeconds']+(s['sourceStartFrame']/fps)*sync['cameraClockRate'])*fps)
edit['sourceIdentities']={'camera':'/Volumes/Untitled/PRIVATE/M4ROOT/CLIP/C0012.MP4','voice':'/Users/alexchensmacmini/Downloads/Claude For Beginners Sep 15.m4a','cameraOriginalBytes':30736793474}
(dest/'src/edit.json').write_text(json.dumps(edit,indent=2))
(dest/'edit-input.json').write_text(json.dumps(payload,indent=2))
(dest/'sync-report.json').write_text(json.dumps(sync,indent=2))
print(len(labels),'segments',sum(s['sourceEndFrame']-s['sourceStartFrame'] for s in edit['segments'])/fps,'seconds')
