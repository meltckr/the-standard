import bpy,math
from mathutils import Vector
from pathlib import Path
r=Path(__file__).resolve().parent
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=48;scene.cycles.use_denoising=True
scene.render.resolution_x=1440;scene.render.resolution_y=1080;scene.render.resolution_percentage=100
scene.world.color=(.055,.075,.11)
def mat(name,col,metal=0,rough=.4):
 m=bpy.data.materials.new(name);m.diffuse_color=(*col,1);m.use_nodes=True;s=m.node_tree.nodes.get('Principled BSDF');s.inputs['Base Color'].default_value=(*col,1);s.inputs['Metallic'].default_value=metal;s.inputs['Roughness'].default_value=rough;return m
navy=mat('AVC midnight ceramic',(.028,.052,.083),.18,.29);copper=mat('Brushed warm copper',(.5,.22,.10),.65,.32);ballmat=mat('Leather terracotta',(.33,.105,.036),0,.56);seam=mat('Basketball seams',(.018,.026,.036),0,.6)
b=ballmat.node_tree.nodes;links=ballmat.node_tree.links;n=b.new('ShaderNodeTexNoise');n.inputs['Scale'].default_value=140;bum=b.new('ShaderNodeBump');bum.inputs['Strength'].default_value=.22;bum.inputs['Distance'].default_value=.025;links.new(n.outputs['Fac'],bum.inputs['Height']);links.new(bum.outputs['Normal'],b.get('Principled BSDF').inputs['Normal'])
bpy.ops.mesh.primitive_uv_sphere_add(segments=96,ring_count=64,radius=1,location=(.55,0,1.7));ball=bpy.context.object;ball.name='Ball shared by the support';ball.data.materials.append(ballmat);bpy.ops.object.shade_smooth()
def curve(name,points,material,width):
 c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.bevel_depth=width;c.bevel_resolution=4;sp=c.splines.new('POLY');sp.points.add(len(points)-1)
 for p,v in zip(sp.points,points):p.co=(*v,1)
 o=bpy.data.objects.new(name,c);bpy.context.collection.objects.link(o);o.data.materials.append(material);return o
for axis in range(3):
 pts=[]
 for k in range(257):
  t=k/256*math.tau;v=[math.cos(t)*1.006,math.sin(t)*1.006,0];v=Vector(v)
  if axis==1:v=Vector((v.x,0,v.y))
  if axis==2:v=Vector((0,v.x,v.y))
  pts.append(tuple(v+ball.location))
 curve('Leather channel',pts,seam,.016)
# Two broad interlocking supports, an abstract original sculpture rather than a game depiction.
for center,rot,m in [((-1.02,.55,1.25),(math.pi/2,.1,-.22),navy),((1.3,.72,1.27),(math.pi/2,-.18,.25),copper)]:
 bpy.ops.mesh.primitive_torus_add(major_radius=1.28,minor_radius=.12,major_segments=128,minor_segments=24,location=center,rotation=rot);o=bpy.context.object;o.name='Interlocking support';o.data.materials.append(m);bpy.ops.object.shade_smooth()
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.16));bpy.context.object.data.materials.append(navy)
def area(name,loc,power,color,size):
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.name=name;o.data.energy=power;o.data.color=color;o.data.shape='DISK';o.data.size=size;o.rotation_euler=(Vector((0,0,1.2))-o.location).to_track_quat('-Z','Y').to_euler()
area('Warm soft key',(-3,-4,7),850,(1,.79,.62),5);area('Cool edge',(4,2,5),1050,(.57,.73,1),3);area('Broad face',(0,-6,3),350,(1,1,1),4)
bpy.ops.object.camera_add(location=(6,-10,6));cam=bpy.context.object;cam.rotation_euler=(Vector((0,0,1.3))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=7;scene.camera=cam
scene.view_settings.view_transform='AgX';scene.render.image_settings.file_format='PNG';scene.render.filepath=str(r/'assist-sculpture.png');bpy.ops.wm.save_as_mainfile(filepath=str(r/'assist-sculpture.blend'));bpy.ops.render.render(write_still=True)
