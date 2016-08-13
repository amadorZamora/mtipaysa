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
</p>
<ul>
	<li>json</li>
		<ul>
			<li>Content-Type application/json</li>
		</ul>
	<li>xml</li>
		<ul>
			<li>Content-Type application/xml</li>
		</ul>
	<li>html</li>
		<ul>
			<li>Content-Type text/html</li>
		</ul>
</ul>

<ol>
	<li>Recurso Establecimientos</li>
	<p>
		El objeto Establecimiento consta de los siguientes campos:
		<ul>
			<li>id_establecimiento</li>
			<li>direccion</li>
			<li>pais</li>
			<li>telefono</li>
		</ul>
	</p>
	<p>	
		<h4>Métodos</h4>
		<ul>
			<li>GET all</li>
			<p>
				<ul>
					<li>URL: <a href="https://mtipaysa.herokuapp.com/establecimientos">https://mtipaysa.herokuapp.com/establecimientos</a>
					</li>
					<li>Parametros: No aplica</li>
				</ul>
			</p>
			<li>GET by id</li>
			
			<li>PUT</li>
			
			<li>POST</li>
			
			<li>DELETE</li>
		</ul>
	</p>	

	

<li>Recurso Productos</li>

<li>Recurso Inventarios</li>
