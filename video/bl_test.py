import bpy, math, os

# ---- clean scene ----
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
try: scene.render.engine = 'BLENDER_EEVEE_NEXT'
except Exception: scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x = 1080
scene.render.resolution_y = 1920
scene.render.film_transparent = False
for prop, val in [("taa_render_samples", 96), ("use_raytracing", True), ("use_gtao", True), ("use_bloom", True)]:
    try: setattr(scene.eevee, prop, val)
    except Exception: pass

def srgb_lin(c):
    return tuple((x/12.92 if x <= 0.04045 else ((x+0.055)/1.055)**2.4) for x in c)
def hexrgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i+2],16)/255 for i in (0,2,4))
def cmat(name, hexstr, rough=0.65, metal=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes.get('Principled BSDF')
    b.inputs['Base Color'].default_value = (*srgb_lin(hexrgb(hexstr)), 1)
    b.inputs['Roughness'].default_value = rough
    b.inputs['Metallic'].default_value = metal
    return m

CREAM = cmat('cream', '#ECE9E2', 0.92)
SLATE = cmat('slate', '#3A5C84', 0.62)
OFF = cmat('off', '#F4F1E6', 0.72)
ORANGE = cmat('orange', '#D2724E', 0.5)

def rounded_box(name, loc, scale, matr, size=1.0, bev=0.16):
    bpy.ops.mesh.primitive_cube_add(size=size, location=loc)
    o = bpy.context.object; o.name = name
    b = o.modifiers.new('bev', 'BEVEL'); b.width = bev; b.segments = 6
    s = o.modifiers.new('sub', 'SUBSURF'); s.levels = 1; s.render_levels = 2
    bpy.ops.object.shade_smooth()
    o.scale = scale
    o.data.materials.append(matr)
    return o

# ---- floor ----
bpy.ops.mesh.primitive_plane_add(size=60, location=(0, 0, -1.05))
bpy.context.object.data.materials.append(CREAM)

# ---- the loop ring (matte slate torus) ----
bpy.ops.mesh.primitive_torus_add(major_radius=1.0, minor_radius=0.085, major_segments=96, minor_segments=24, location=(0, 0, 0.1))
ring = bpy.context.object; bpy.ops.object.shade_smooth(); ring.data.materials.append(SLATE)
ring.rotation_euler = (math.radians(70), 0, 0)

# ---- central Claude tile (cream) + orange emblem ----
rounded_box('tile', (0, 0, 0.1), (0.52, 0.16, 0.52), OFF, size=1.0, bev=0.18)
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=3, radius=0.2, location=(0, -0.18, 0.1))
bpy.context.object.data.materials.append(ORANGE); bpy.ops.object.shade_smooth()

# ---- small tiles riding the ring ----
for i in range(4):
    a = math.radians(90 + i*90)
    rounded_box(f'chip{i}', (math.cos(a)*1.0, 0.0, 0.1 + math.sin(a)*1.0*math.cos(math.radians(70))), (0.16, 0.07, 0.16), SLATE if i % 2 else OFF, size=1.0, bev=0.2)

# ---- lighting ----
def area(loc, energy, size, color=(1,1,1)):
    bpy.ops.object.light_add(type='AREA', location=loc)
    L = bpy.context.object.data; L.energy = energy; L.size = size; L.color = color
    return bpy.context.object
key = area((3.2, -3.0, 5.0), 2600, 7); key.rotation_euler = (math.radians(28), math.radians(18), 0)
area((-3.5, -1.5, 3.0), 700, 6, (0.85, 0.9, 1.0))
area((0, 3.5, 2.5), 900, 6, (1, 1, 1))  # rim

# warm world fill for soft GI
world = bpy.data.worlds.new('w'); scene.world = world; world.use_nodes = True
world.node_tree.nodes['Background'].inputs[0].default_value = (*srgb_lin(hexrgb('#ECE9E2')), 1)
world.node_tree.nodes['Background'].inputs[1].default_value = 0.55

# ---- camera ----
bpy.ops.object.empty_add(location=(0, 0, 0.15)); target = bpy.context.object
bpy.ops.object.camera_add(location=(0, -8.6, 0.7))
cam = bpy.context.object; scene.camera = cam
cam.data.lens = 52; cam.data.sensor_fit = 'VERTICAL'
c = cam.constraints.new('TRACK_TO'); c.target = target; c.track_axis = 'TRACK_NEGATIVE_Z'; c.up_axis = 'UP_Y'

scene.view_settings.view_transform = 'AgX'
scene.render.filepath = os.path.expanduser('~/Downloads/bl_test.png')
bpy.ops.render.render(write_still=True)
print("RENDER DONE")
