# Web Service wsPaysa
<p>
Servicio web rest desarrollado en nodeJs, desplegado en servidor Heroku con base de datos MySQL.
</p>
<p>
A continuación se describen los recursos disponibles de este servicio web ademas de las formas de utilización.
</p>

<h1>Recursos</h1>
<p>
Nota1: Cada recurso en sus métodos GET Y GET ALL retornar los datos en los siguientes formatos (que se pueden solicitar mediante negociacion de contenido):

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
</p>
<p>
Nota2:Ante una instalación propia de este webservice, la url debe ser modificada con su propio host. Se debe cambiar https://mtipaysa.herokuapp.com por su host particular.
</p>

<ol>
	<li>Establecimientos</li>
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
			<li>GET All</li>
			<p>
				<ul>
					<li>URL: https://mtipaysa.herokuapp.com/establecimientos
					</li>
					<li>Parámetros: No aplica</li>
				</ul>
			</p>
			<li>GET by Id</li>
			<p>
				<ul>
					<li>URL: https://mtipaysa.herokuapp.com/establecimientos/<div style="color:red">id_establecimiento</div>
					</li>
					<li>Parámetros:</li>
					<p>
						<ul>
							<li style="color:red">id_establecimiento: Número Entero</li>
						</ul>
					</p>
				</ul>
			</p>





			
			<li>PUT</li>
			
			<li>POST</li>
			
			<li>DELETE</li>
		</ul>
	</p>	

	

<li>Productos</li>

<li>Inventarios</li>
