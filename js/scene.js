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
//////////////////////PLANO////BACKGROUND/////////////////////
        let planeGeometry = new THREE.PlaneGeometry(300,600);
        planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
        let groundMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            side: THREE.DoubleSide
            });
        let plane = new THREE.Mesh(planeGeometry, groundMaterial);
        plane.receiveShadow  = true;
        let mesh;
    
        let loader = new THREE.TextureLoader();
////////////////////////// ESFERA //////////////////////////
    loader.load('public/map1.jpg', function(texture){
            let geometry = new THREE.SphereGeometry(15,50,50)
            let material = new THREE.MeshBasicMaterial({
                //color: 0xffff00,
                map: texture
                , wireframe: true
            })
    
            mesh = new THREE.Mesh(geometry, material);
    
            mesh.position.y = 25;
            mesh.position.z = 40;

            mesh.castShadow = true;
           // scene.add(mesh);
        })

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
       let material = new THREE.MeshBasicMaterial( { 
           color: 0xffff00 
           //,wireframe: true
        } );
       let torus = new THREE.Mesh( geometryT, material );
       torus.castShadow = true;

////////////////////// PIRAMIDE //////////////////////////////
        let geometryP = new THREE.CylinderGeometry( 0, 20, 20, 4 );
        let materialP = new THREE.MeshBasicMaterial( {
            color: 0xff00ff 
            //, wireframe:true
        } );
        let pyramid = new THREE.Mesh( geometryP, materialP );
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
        scene.add(plane);
        scene.add(cube);
        scene.add(torus);
        scene.add(pyramid);
        
        scene.add(pointLight);
    
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