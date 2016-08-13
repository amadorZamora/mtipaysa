# Web Service wsPaysa
<p>
Servicio web rest desarrollado en nodeJs, desplegado en servidor Heroku con base de datos MySQL.
</p>
<p>
A continuación se describen los recursos disponibles de este servicio web ademas de las formas de utilización.
</p>

<h1>Recursos</h1>
<p>
Nota: Cada recurso en sus métodos GET Y GET ALL retornar los datos en los siguientes formatos (que se pueden solicitar mediante negociacion de contenido):
- json: Content-Type application/json  
- xml: Content-Type application/xml
- html: Content-Type text/html
</p>

<ol>
<li>Recurso Establecimientos</li>
<p>
El objeto Establecimiento consta de los siguientes campos:
- id_establecimiento 
- direccion
- pais
- telefono
</p>	

	<li>
		<ol>GET all</ol>
		<ol>GET by id</ol>
		<ol>PUT</ol>
		<ol>POST</ol>
		<ol>DELETE</ol>
	</li>

<li>Recurso Productos</li>

<li>Recurso Inventarios</li>




- Api funciona de la siguiente forma:
- 3 objetos: establecimiento, producto, inventario
- Metodos get, get All, put, post , delete para cada respositorio
- Se agrega sitio web desarrollado en angulas js con funcionalidades para establecimiento, producto y listado de inventario por establecimiento.
- Se cambia base de datos para aumentar performance de sitio web.
