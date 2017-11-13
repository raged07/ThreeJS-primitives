(function(){
        let scene = new THREE.Scene();
        const aspectRatio = window.innerWidth / window.innerHeight;
        let camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 250);
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.soft = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
/////////////////// CAMARA ///////////////////////////////////
        camera.position.z = 10;
        camera.position.y = 130;
        camera.rotation.x = -1.5;

        let loader = new THREE.TextureLoader();
/////////////////// PLANO////BACKGROUND ///////////////////////////
    loader.load('public/basket.jpg', function(texture){
        let planeGeometry = new THREE.PlaneGeometry(300,250);
        planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
        let groundMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide
            });
        let plane = new THREE.Mesh(planeGeometry, groundMaterial);
        plane.receiveShadow  = true;
        scene.add(plane);
        });
//////////////////////// CUBO ////////////////////////////////
        let geometry = new THREE.BoxGeometry(20,20,20,20);
        let groundMaterialC = new THREE.MeshPhongMaterial({
            color: 0xff00ff
            //,wireframe: true
        });
        let cube = new THREE.Mesh(geometry, groundMaterialC);
        cube.castShadow = true;

////////////// TOROIDE (DONA xD) ////////////////////////////
       let geometryT = new THREE.TorusGeometry( 15, 5, 20, 100 );
       let material = new THREE.MeshPhongMaterial({ 
           color: 0xffff00 
           //,wireframe: true
        } );
       let torus = new THREE.Mesh( geometryT, material );
       
        torus.castShadow = true;
        torus.castShadow = true;

////////////////////// PIRAMIDE //////////////////////////////
        let geometryP = new THREE.CylinderGeometry( 0, 20, 20, 4 );
        let materialP = new THREE.MeshPhongMaterial( {
            color: 0x00ffff 
            //, wireframe:true
        } );
        let pyramid = new THREE.Mesh( geometryP, materialP );
        let c=0;
        
        pyramid.receiveShadow = true;
        pyramid.castShadow = true;
///////////////////// LUZ //////////////////////////////////
        let pointLight = new THREE.PointLight(0x606060);
    
        pointLight.position.y = 60;
        pointLight.position.z = 10;
/////////////////// POSICIONES /////////////////////////////
        cube.position.x = -60;
        cube.position.y = 25;

        torus.position.y = 20;
        torus.position.z = -40;

        pyramid.position.y = 25;
        pyramid.position.x = 50;
        pyramid.position.z = 30;

        pointLight.castShadow = true;
    
        scene.background = new THREE.Color(0xeeeeee);
        scene.add(new THREE.AmbientLight(0x505050));
        
        scene.add(cube);
        scene.add(torus);
        scene.add(pyramid);
        
        scene.add(pointLight);
////////////////// Cambiar Textura ////////////////////////
        let changer = 0;
        document.body.onkeypress= function(){  // Dectecta si se presiona alguna tecla
         if(changer % 2 == 0){                 // Se inicializa una funcion que determina el residuo 
                                               //para alternar entre 2 valores y cargar, ya sea, una u otra textura
             texture = new THREE.TextureLoader().load('../public/lava.jpg');
            }
         else{
             texture = new THREE.TextureLoader().load('../public/water.gif');
            }
                                                // Se alterna entre las dos texturas al oprimir cualquier tecla
                                                // Se carga la textura a las 3 primitivas
            torus.material = new THREE.MeshBasicMaterial({map:texture})
            pyramid.material = new THREE.MeshBasicMaterial({map:texture})
            cube.material = new THREE.MeshBasicMaterial({map:texture})
            renderer.render(scene, camera);
                                                // Aumentamos el contador para que haya alternancia
            changer += 1;
         }
                                                //Controles de orbita, sirve para mover la camara
        let controls = new THREE.OrbitControls(camera, renderer.domElement);

        function loop(){
            requestAnimationFrame(loop);
            cube.rotation.y += 0.01;
            pyramid.rotation.z += 0.01;
            torus.rotation.x += 0.01;
            renderer.render(scene, camera);
        }
    
        loop();
    
    })();