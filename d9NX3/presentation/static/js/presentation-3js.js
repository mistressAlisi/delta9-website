            
            import * as THREE from '/static/threejs/build/three.module.js';
			import { OrbitControls } from '/static/threejs/examples/jsm/controls/OrbitControls.js';
			import { GLTFLoader } from '/static/threejs/examples/jsm/loaders/GLTFLoader.js';
			import { DRACOLoader } from '/static/threejs/examples/jsm/loaders/DRACOLoader.js';
			import { RGBELoader } from '/static/threejs/examples/jsm/loaders/RGBELoader.js';
			import { RoughnessMipmapper } from '/static/threejs/examples/jsm/utils/RoughnessMipmapper.js';
			import { EffectComposer } from '/static/threejs/examples/jsm/postprocessing/EffectComposer.js';
			import { RenderPass } from '/static/threejs/examples/jsm/postprocessing/RenderPass.js';
			import { UnrealBloomPass } from '/static/threejs/examples/jsm/postprocessing/UnrealBloomPass.js';
			let camera, scene, renderer, controls;

			init();
			render();
            
			function init() {

				const container = $("#3dcanvas")[0];
                const group = new THREE.Group();
                window.group = group;
				const material = new THREE.MeshPhysicalMaterial({
				color: "#4A0965",
				transparent: false,
				opacity: 1,
				metalness: 0.5,
				roughness: 0.5,
                
				});
// 				document.body.appendChild( container );  
//                 console.log(window.innerWidth/window.innerHeight,window.innerWidth,window.innerHeight);
                var aspect = $("#3dcanvas").width()/$("#3dcanvas").height();
//                 console.warn(aspect,$("#3dcanvas").width(),$("#3dcanvas").height());
				camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.25, 20 );
				camera.position.set(-0.5,2,1.25);
                window.cam = camera;
				scene = new THREE.Scene();
                    new RGBELoader()
					.setDataType( THREE.UnsignedByteType )
					.setPath( '/static/textures/' )
					.load( 'venice_sunset_1k.hdr', function ( texture ) {

						const envMap = pmremGenerator.fromEquirectangular( texture ).texture;

// 						scene.background =  transparent;
						scene.environment = envMap;

						texture.dispose();
						pmremGenerator.dispose();

						render();
                
                        
                        const dracoLoader = new DRACOLoader();
                        dracoLoader.setDecoderPath('/static/threejs/examples/js/libs/draco/');
						const loader = new GLTFLoader().setPath( '/static/models/' );
						loader.setDRACOLoader(dracoLoader);
						loader.load( 'd9NX3.glb', function ( gltf ) {
//                             window.gltfd= gltf;
                            $("#3d_placehldr")[0].style.display = 'none';
                            $("#3d_help")[0].innerHTML = "(Click and drag to rotate, right click and drag to move!)";
							gltf.scene.traverse( function ( child ) {

								if ( child.isMesh ) {
//                                     d9Mesh.add(child);
                                    //console.log('Children here: '+child);
                                    //window.childObjc = child;
// 									roughnessMipmapper.generateMipmaps( child.material );

								}

							});
                            scene.add( gltf.scene );
							window.scene = scene;
// 							render();
							
                             var lid_obj = scene.getChildByName('SystemLid');
                             
                             lid_obj.material = material;
                             lid_obj.material.needsUpdate = true;
                             //console.log('Lid obj',lid_obj);
							//roughnessMipmapper.dispose();#00058D
                             // Center camera...
                             var bb = new THREE.Box3();
                             window.bb = bb;
                             bb.setFromObject(lid_obj);
                             bb.center(controls.target);
                            setMaterials();
							render();
                            
                            },
							function ( xhr ) {
                            var loadPct = Math.round(( xhr.loaded / xhr.total * 100 ));
                            console.log("Loading NX3 Model: "+loadPct+"...");
                            $("#load_pct")[0].innerHTML = loadPct;
                            
        
                            }
							);
                    


						} );
//                 } );    

				renderer = new THREE.WebGLRenderer( { antialias: true,alpha: true } );
                window.renderer = renderer;
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1;
				renderer.outputEncoding = THREE.sRGBEncoding;
				container.appendChild( renderer.domElement );

				const pmremGenerator = new THREE.PMREMGenerator( renderer );
				pmremGenerator.compileEquirectangularShader();

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.minDistance = .5;
				controls.maxDistance = 1.5;
				controls.target.set( 0, 0, 0 );
				controls.autoRotate = true;
				window.controls=  controls;
				controls.update();
				
				const bloom_params = {
				exposure: 1.5,
				bloomStrength: 2,
				bloomThreshold: 0,
				bloomRadius: 0.66
                };
				const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
				bloomPass.threshold = bloom_params.bloomThreshold;
				bloomPass.strength = bloom_params.bloomStrength;
				bloomPass.radius = bloom_params.bloomRadius;
                
                const renderScene = new RenderPass( scene, camera );
				const composer = new EffectComposer( renderer );
				window.composer = composer;
				composer.addPass( renderScene );
				composer.addPass( bloomPass );
				composer.render();
				window.addEventListener( 'resize', onWindowResize );

			}
			
            function setMaterials() {
            // Lens Material:
                const lens_params = {
				color: 0xffffff,
				transmission: 1,
				opacity: 1,
				metalness: 0,
				roughness: 0.1,
				reflectivity: 0.85,
				envMapIntensity: 1,
				lightIntensity: 1,
				exposure: 1,
				emissive:"#ffffff",
				emissiveIntenisty:.2
                };
                // Chrome Material:
                const chrome_params = {
				color: 0xffffff,
				transmission: 1,
				opacity: 1,
				metalness: 1,
				roughness: .05,
				reflectivity: 0.85,
				envMapIntensity: 1,
				lightIntensity: 1,
				exposure: 1,
				emissive:"#ffffff",
				emissiveIntenisty:.5
                };
                
                // Heatsink Material:
                const heatsink_params = {
				color: 0x44454a,
				transmission: 0,
				opacity: 1,
				metalness: .7,
				roughness: .3,
				reflectivity: 0.45,
				envMapIntensity: 1,
				lightIntensity: 1,
				exposure: 1,
				emissive:"#ffffff",
				emissiveIntenisty:.1
                };

                const lens_material = new THREE.MeshPhysicalMaterial( {
					color: lens_params.color,
					metalness: lens_params.metalness,
					roughness: lens_params.roughness,
					reflectivity: lens_params.reflectivity,
					envMapIntensity: lens_params.envMapIntensity,
					transmission: lens_params.transmission, // use material.transmission for glass materials
					opacity: lens_params.opacity,
					side: THREE.DoubleSide,
					transparent: true
				} );
				
				const chrome_material = new THREE.MeshPhysicalMaterial( {
					color: chrome_params.color,
					metalness: chrome_params.metalness,
					roughness: chrome_params.roughness,
					reflectivity: chrome_params.reflectivity,
					envMapIntensity: chrome_params.envMapIntensity,
					transmission: chrome_params.transmission, // use material.transmission for glass materials
					opacity: chrome_params.opacity,
					side: THREE.DoubleSide,
					transparent: false
				} );
				
				const heatsink_material = new THREE.MeshPhysicalMaterial( {
					color: heatsink_params.color,
					metalness: heatsink_params.metalness,
					roughness: heatsink_params.roughness,
					reflectivity: heatsink_params.reflectivity,
					envMapIntensity: heatsink_params.envMapIntensity,
                        
					transmission: heatsink_params.transmission, // use material.transmission for glass materials
					opacity: heatsink_params.opacity,
					side: THREE.DoubleSide,
					transparent: false
				} );
				
            // Blue LED Material:
                const blueled_material = new THREE.MeshStandardMaterial ({
                    color: "#105EE8",
                    emissive: "#0B1F76",
                    emissiveIntensity:20,
                });
                window.blm = blueled_material;
             // Red LED Material:
                const redled_material = new THREE.MeshStandardMaterial ({
                    color: "#DC10C6",
                    emissive: "#760B6A",
                    emissiveIntensity:20,
                });
            // Green LED material:
                const greenled_material = new THREE.MeshStandardMaterial ({
                    color: "#10DC3C",
                    emissive: "#157D2B",
                    emissiveIntensity:20,
                });
                
            // Far Red LED Material:
                const farled_material = new THREE.MeshStandardMaterial ({
                    color: "#F30911",
                    emissive: "#920B10",
                    emissiveIntensity:20,
                });
//                 const d9Mesh = new THREE.Group();
                scene.traverse(function(obj){
//                 console.log("Object Traverse!",obj.type);
//                 d9Mesh.add(obj);
                if (obj.type == "Mesh") {
//                 group.add(obj);
                var _material = obj.material;
                if (_material != undefined) {
//                     console.log(_material.name);
                    // Do a quick and dirty:
                    
                    // set all lenses to the lens_material material:
                    if (_material.name == "Lens") {
//                         console.log(_material.name);
                        obj.material = lens_material;
                        obj.material.needsUpdate = true;
                    };
                    
                    // set all blue LEDs to the BLUE_LED material:
                    if (_material.name == "Blue LED") {
//                         console.log(_material.name);
                        obj.material = blueled_material;
                        obj.material.needsUpdate = true;
                    };
                    
                    // set all red LEDs to the BLUE_LED material:
                    if (_material.name == "Red LED") {
//                         console.log(_material.name);
                        obj.material = redled_material;
                        obj.material.needsUpdate = true;
                    };
                    
                    // set all far red LEDs to the BLUE_LED material:
                    if (_material.name == "Far Red LED") {
//                         console.log(_material.name);
                        obj.material = farled_material;
                        obj.material.needsUpdate = true;
                    };
                    
                    // set all green LEDs to the BLUE_LED material:
                    if (_material.name == "Green LED") {
//                         console.log(_material.name);
                        obj.material = greenled_material;
                        obj.material.needsUpdate = true;
                    };
                    // set all chrome to the chrome material:
                    if (_material.name == "Chrome") {
//                         console.log(_material.name);
                        obj.material = chrome_material;
                        obj.material.needsUpdate = true;
                    };
                      // set all chrome to the chrome material:
                    if (_material.name == "Heatsink") {
//                         console.log(_material.name);
                        obj.material = heatsink_material;
                        obj.material.needsUpdate = true;
                    };
                }};
                });
            }
            
			function onWindowResize() {
                
				camera.aspect = window.innerWidth/window.innerHeight;
				camera.updateProjectionMatrix();
                
                var width = $("#3dcanvas").width();
                var height = width / 2;
//                 console.log("Resizer",width,height);
				renderer.setSize(width,height);
                
				render();

			}
            window._resizer = onWindowResize
			//

			function render() {
				renderer.render( scene, camera );
				
				
				

			}
			
        function animate() {
    
        window.controls.update();
        requestAnimationFrame( animate );
        renderer.render( scene, camera );

        }
    


        window.animate = animate;
        window.render = render;
        window._resizer();
        animate();
