# Web Service wsPaysa
<p>
Servicio web rest desarrollado en nodeJs, desplegado en servidor Heroku con base de datos MySQL (JawsMySQL).
</p>
<p>
A continuación se describen los recursos disponibles de este servicio web ademas de las formas de utilización.
</p>

<h1>Recursos</h1>
<h3>Notas:</h3>
<ul>
	<li>
			<p>
			<h4>Cada recurso en sus métodos GET Y GET ALL retornar los datos en los siguientes formatos (que se pueden solicitar mediante negociacion de contenido):</h4>
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
		
	</li>
	<li>
		<p>
			<h4>Ante una instalación propia de este webservice, la url debe ser modificada con su propio host. Se debe cambiar https://mtipaysa.herokuapp.com por su host particular.</h4>
		</p>
	</li>
	<li>
		<p>
			<h4>Las operaciones disponibles sobre los recursos retornan los sigientes codigos  HTTP de estado en caso de éxito de la operación:</h4>
			<ul>
				<li>GET : 200</li>
				<li>POST: 201</li>	
				<li>PUT: 204</li>
				<li>DELETE: 204</li>
			</ul>
			Esta implementación esta basada en la información oficial de utilización de codigos HTTP por W3C <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html">Link</a>
		</p>
	</li>	
</ul>


<ol>
	<li><h3>Establecimientos</h3></li>
	<p>
		El objeto Establecimiento consta de los siguientes campos:
		<ul>
			<li>id_establecimiento: number          <h5>**No necesario para metodo post</h5></li>
			<li>direccion: string</li>
			<li>pais: string</li>
			<li>telefono: string</li>
		</ul>
	</p>
	<p>	
		<h4>Métodos</h4>
		<ul>
			<li>GET All</li>
			<p>
				<ul>
					<li>Acceso: {host}/establecimientos
					</li>
					<li>Parámetros: No aplica</li>
					<li>Ejm URL: http://mtipaysa.herokuapp.com/establecimientos</li>
				</ul>
			</p>
			<li>GET by Id</li>
			<p>
				<ul>
					<li>Acceso: {host}/establecimientos/:id_establecimiento
					</li>
					<li>Parámetros:</li>
						<p>
							<ul>
								<li>id_establecimiento: number</li>	
							</ul>
						</p>
					<li>Ejm URL: http://mtipaysa.herokuapp.com/establecimientos/1</li>
				</ul>
			</p>
			<li>POST</li>
			<p>
				<ul>
					<li>Acceso: {host}/establecimientos
					</li>
					<li>Parámetros:</li>
						<p>
							<ul>
								<li>establecimiento: object</li>	
							</ul>
						</p>
					<li>Ejm URL: http://mtipaysa.herokuapp.com/establecimientos</li>
				</ul>
			</p>
			<li>PUT</li>
			<p>
				<ul>
					<li>Acceso: {host}/establecimientos
					</li>
					<li>Parámetros:</li>
						<p>
							<ul>
								<li>establecimiento: object</li>	
							</ul>
						</p>
					<li>Ejm URL: http://mtipaysa.herokuapp.com/establecimientos</li>
				</ul>
			</p>
			<li>DELETE</li>
			<p>
				<ul>
					<li>Acceso: {host}/establecimientos/:id_establecimiento
					</li>
					<li>Parámetros:</li>
						<p>
							<ul>
								<li>id_establecimiento: number</li>	
							</ul>
						</p>
					<li>Ejm URL: http://mtipaysa.herokuapp.com/establecimientos/1</li>
				</ul>
			</p>

		</ul>
	</p>	


<li><h3>Productos</h3></li>
<p>
		El objeto PRODUCTO consta de los siguientes campos:
		<ul>
			<li>codigo: string          <h5>**No necesario para metodo post</h5></li>
			<li>nombre: string</li>
			<li>moneda: string</li>
			<li>descripcion: string</li>
			<li>precio: number(float)</li>
		</ul>
	</p>
	<p>	
		<h4>Métodos</h4>
		<ul>
			<li>GET All</li>
			<p>
				<ul>
					<li>Acceso: {host}/productos
					</li>
					<li>Parámetros: No aplica</li>
					<li>Ejm: http://mtipaysa.herokuapp.com/productos</li>
				</ul>
			</p>
			<li>GET by Id</li>
			<p>
				<ul>
					<li>Acceso: {host}/productos/:codigo
					</li>
					<li>Parámetros:</li>
						<p>
							<ul>
								<li>codigo: string</li>	
							</ul>
						</p>
					<li>Ejm: http://mtipaysa.herokuapp.com/productos/AABBCC</li>
				</ul>
			</p>
			<li>POST</li>
			<p>
				<ul>
					<li>Acceso: {host}/productos
					</li>
					<li>Parámetros:</li>
						<p>
							<ul>
								<li>producto: object</li>	
							</ul>
						</p>
					<li>Ejm URL: http://mtipaysa.herokuapp.com/productos</li>
				</ul>
			</p>
			<li>PUT</li>
			<p>
				<ul>
					<li>Acceso: {host}/productos
					</li>
					<li>Parámetros:</li>
						<p>
							<ul>
								<li>producto: object</li>	
							</ul>
						</p>
					<li>Ejm URL: http://mtipaysa.herokuapp.com/productos</li>
				</ul>
			</p>
			<li>DELETE</li>
			<p>
				<ul>
					<li>Acceso: {host}/productos/:id_producto
					</li>
					<li>Parámetros:</li>
						<p>
							<ul>
								<li>id_producto: codigo</li>	
							</ul>
						</p>
					<li>Ejm URL: http://mtipaysa.herokuapp.com/establecimientos/1</li>
				</ul>
			</p>

		</ul>
	</p>


<li><h3>Inventarios</h3></li>
<p>
		El objeto inventario consta de los siguientes campos:
		<ul>
			<li>id_lineaInventario: number          <h5>**No necesario para metodo post</h5></li>
			<li>establecimiento_id_establecimiento: number</li>
			<li>producto_codigo: string</li>
			<li>cantidadProductos: number</li>
		</ul>
	</p>
	<p>	
		<h4>Métodos</h4>
		<ul>
			<li>GET All</li>
			<p>
				<ul>
					<li>Acceso: {host}/inventarios
					</li>
					<li>Parámetros: No aplica</li>
					<li>Ejm: http://mtipaysa.herokuapp.com/inventarios</li>
				</ul>
			</p>
			<li>GET All filter by Establecimiento</li>
			<p>
				<ul>
					<li>Acceso: {host}/inventariosFilterByEstablecimiento/:id_establecimiento
					</li>
					<li>Parámetros:</li>
						<p>
							<ul>
								<li>id_establecimiento: number</li>	
							</ul>
						</p>
					<li>Ejm: http://mtipaysa.herokuapp.com/inventariosFilterByEstablecimiento/1</li>
				</ul>
			</p>

			<li>GET by Id</li>
			<p>
				<ul>
					<li>Acceso: {host}/inventarios/:id_lineaInventario
					</li>
					<li>Parámetros:</li>
						<p>
							<ul>
								<li>id_lineaInventario: number</li>	
							</ul>
						</p>
					<li>Ejm: http://mtipaysa.herokuapp.com/inventarios/1</li>
				</ul>
			</p>
			<li>POST</li>
			<p>
				<ul>
					<li>Acceso: {host}/inventarios
					</li>
					<li>Parámetros:</li>
						<p>
							<ul>
								<li>inventario: object</li>	
							</ul>
						</p>
					<li>Ejm URL: http://mtipaysa.herokuapp.com/inventarios</li>
				</ul>
			</p>
			<li>PUT</li>
			<p>
				<ul>
					<li>Acceso: {host}/inventarios
					</li>
					<li>Parámetros:</li>
						<p>
							<ul>
								<li>inventario: object</li>	
							</ul>
						</p>
					<li>Ejm URL: http://mtipaysa.herokuapp.com/inventarios</li>
				</ul>
			</p>
			<li>DELETE</li>
			<p>
				<ul>
					<li>Acceso: {host}/inventarios/:id_lineaInventario
					</li>
					<li>Parámetros:</li>
						<p>
							<ul>
								<li>id_lineaInventario: number</li>	
							</ul>
						</p>
					<li>Ejm URL: http://mtipaysa.herokuapp.com/inventarios/1</li>
				</ul>
			</p>



		</ul>
	</p>
</ol>
