(function(){
 +        let scene = new THREE.Scene();
 +        const aspectRatio = window.innerWidth / window.innerHeight;
 +        let camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 250);
 +        let renderer = new THREE.WebGLRenderer();
 +        renderer.setSize(window.innerWidth, window.innerHeight);
 +        document.body.appendChild(renderer.domElement);
 +        renderer.shadowMap.enabled = true;
 +        renderer.shadowMap.soft = true;
 +        renderer.shadowMap.type = THREE.PCFShadowMap;
 +/////////////////// CAMARA ///////////////////////////////////
 +//Aquí en la cámara le vamos a dar una posición en z de 10, en y de 130 y en x de -1.5
 +        camera.position.z = 10;
 +        camera.position.y = 130;
 +        camera.rotation.x = -1.5;
 +
 +        let loader = new THREE.TextureLoader();
 +/////////////////// PLANO////BACKGROUND ///////////////////////////
 +/**Le agregamos una imagen de cancha de básquetbol como textura, creamos la geometría del plano 
 +de 300,250 luego agregamos un applymatrix que multiplica la matriz actual por la que se 
 +especifica, que es una matrix4 la cual va efectuar una rotación de pi/2.
 +Luego vamos a crear el material de fondo creando una nueva propiedad de three que se llama 
 +MeshPhongMaterial que es un material para superficies brillantes con reflejos espectaculares, le
 + agregamos textura al plano y a la cara le vamos agregar la propiedad Three.doublesize para que la 
 +imagen se vea por los dos lados
 +Luego en el plano vamos a crear una nueva propiedad de Three que se llama mesh es una malla y 
 +a esa propiedad le vamos a agregar el material del plano y la geometría plana, luego le vamos 
 +agregar sombra y vamos agregar el plano a la escena.
 + */
 +    loader.load('public/basket.jpg', function(texture){
 +        let planeGeometry = new THREE.PlaneGeometry(300,250);
 +        planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
 +        let groundMaterial = new THREE.MeshPhongMaterial({
 +            map: texture,
 +            side: THREE.DoubleSide
 +            });
 +        let plane = new THREE.Mesh(planeGeometry, groundMaterial);
 +        plane.receiveShadow  = true;
 +        scene.add(plane);
 +        });
 +//////////////////////// CUBO ////////////////////////////////
 +        /*ancho - Ancho de los lados en el eje X.
 +        altura - Altura de los lados en el eje Y.
 +        profundidad - Profundidad de los lados en el eje Z.
 +        widthSegments- Número de caras segmentadas a lo largo del ancho de los lados.*/
 +        let geometry = new THREE.BoxGeometry(20,20,20,20);//creamos nuestro cubo
 +        let groundMaterialC = new THREE.MeshPhongMaterial({//hacemos el material brillante con reflejos
 +            color: 0xff00ff
 +            //,wireframe: true
 +        });
 +        let cube = new THREE.Mesh(geometry, groundMaterialC); //mostramos nuestro cubo
 +        cube.castShadow = true;//en verdadero si el objeto tapa la luz, por lo que proyecta una sombra. 
 +        cube.receiveShadow = true;//en verdadero si se supone que el objeto recibirá sombras.
 +
 +////////////// TOROIDE (DONA xD) ////////////////////////////
 +        /*radio
 +        tubo - Diámetro del tubo.
 +        radialSegments
 +        tubularSegments
 +        */
 +       let geometryT = new THREE.TorusGeometry( 15, 5, 20, 100 );// creamos nuestra dona
 +       let material = new THREE.MeshPhongMaterial({ // hacer el material brillante con reflejos
 +           color: 0xffff00 
 +           //,wireframe: true
 +        } );
 +       let torus = new THREE.Mesh( geometryT, material );// mostramos nuestra dona
 +       
 +        torus.receiveShadow = true;//en verdadero si se supone que el objeto recibirá sombras.
 +        torus.castShadow = true;//en verdadero si el objeto tapa la luz, por lo que proyecta una sombra. 
 +
 +////////////////////// PIRAMIDE //////////////////////////////
 +        /*radioTop - Radio del cilindro en la parte superior.
 +        RadiusBottom - Radio del cilindro en la parte inferior.
 +        altura - Altura del cilindro.
 +        radiusSegments - Número de caras segmentadas alrededor de la circunferencia del cilindro.*/
 +        let geometryP = new THREE.CylinderGeometry( 0, 20, 20, 4 );
 +// Un material para superficies brillantes con reflejos especulares
 +        let materialP = new THREE.MeshPhongMaterial( { 
 +            color: 0x00ffff //su parametro es color aqua
 +            //, wireframe:true
 +        } );
 +        let pyramid = new THREE.Mesh( geometryP, materialP );// mostramos nuestra piramide
 +        
 +        
 +        pyramid.receiveShadow = true;//en verdadero si se supone que el objeto recibirá sombras.
 +        pyramid.castShadow = true; //en verdadero si el objeto tapa la luz, por lo que proyecta una sombra. 
 +///////////////////// LUZ //////////////////////////////////
 +                //Ambiental
 +        let pointLight = new THREE.PointLight(0x606060);//Una luz que se emite desde un único punto en todas las direcciones
 +                //Puntual
 +        pointLight.position.y = 60;
 +        pointLight.position.z = 10;
 +/////////////////// POSICIONES /////////////////////////////
 +        /*El cubo va a quedar en posición en x de -60 y de y en 25; La dona va a quedar en la posición de y 
 +        en 20 y en z en -40; la pirámide va a quedar en una posición de x,y, y z, y en 25, x en 50, y z en 30.
 +        El punto de la luz va a arrojar una sombra.
 +        Le agregamos color a la escena, un color gris, luego le agregaremos a la escena una luz ambiental 
 +        entre gis y negro.
 +        Y por último agregamos las figuras a la escena y el punto de luz. */
 +
 +        cube.position.x = -60;
 +        cube.position.y = 25;
 +
 +        torus.position.y = 20;
 +        torus.position.z = -40;
 +
 +        pyramid.position.y = 25;
 +        pyramid.position.x = 50;
 +        pyramid.position.z = 30;
 +
 +        pointLight.castShadow = true;
 +    
 +        scene.background = new THREE.Color(0xeeeeee);
 +        scene.add(new THREE.AmbientLight(0x505050));
 +        
 +        scene.add(cube);
 +        scene.add(torus);
 +        scene.add(pyramid);
 +        
 +        scene.add(pointLight);
 +////////////////// Cambiar Textura ////////////////////////
 +        let changer = 0;
 +        document.body.onkeypress= function(){  // Dectecta si se presiona alguna tecla
 +         if(changer % 2 == 0){                 // Se inicializa una funcion que determina el residuo 
 +                                               //para alternar entre 2 valores y cargar, ya sea, una u otra textura
 +             texture = new THREE.TextureLoader().load('../public/lava.jpg');
 +            }
 +         else{
 +             texture = new THREE.TextureLoader().load('../public/water.gif');
 +            }
 +                                                // Se alterna entre las dos texturas al oprimir cualquier tecla
 +                                                // Se carga la textura a las 3 primitivas
 +            torus.material = new THREE.MeshBasicMaterial({map:texture})
 +            pyramid.material = new THREE.MeshBasicMaterial({map:texture})
 +            cube.material = new THREE.MeshBasicMaterial({map:texture})
 +            renderer.render(scene, camera);
 +                                                // Aumentamos el contador para que haya alternancia
 +            changer += 1;
 +         }
 +                                                //Controles de orbita, sirve para mover la camara
 +        let controls = new THREE.OrbitControls(camera, renderer.domElement);
 +
 +        function loop(){
 +            requestAnimationFrame(loop);
 +            cube.rotation.y += 0.01;
 +            pyramid.rotation.z += 0.01;
 +            torus.rotation.x += 0.01;
 +            renderer.render(scene, camera);
 +        }
 +    
 +        loop();
 +    
 +    })();
