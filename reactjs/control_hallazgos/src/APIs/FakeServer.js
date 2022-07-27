
class FakeServer {

  constructor(dispatch){
      this.dispatch = dispatch
      this.hallazgos= [
        {
          hallazgo: "Lorem",
          descripcion: "Adipisci, expedita beatae! Veritatis eligendi",
          notas: "",
          area: "Steinert",
          prioridad: "1",
          isActive: "1",
          status: 1,
          imgHallazgo: "antes",
          imgSolucion: null
        },{
          hallazgo: "Lorem",
          descripcion: "Morbi odio sapien, consequat vitae nulla eget, auctor tincidunt orci.",
          notas: "",
          area: "Presas",
          prioridad: "2",
          isActive: "1",
          status: 1,
          imgHallazgo: "antes",
          imgSolucion: null
        },{
          hallazgo: "Lorem",
          descripcion: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          notas: "",
          area: "Trituracion",
          prioridad: "4",
          isActive: "1",
          status: 1,
          imgHallazgo: "antes",
          imgSolucion: null
        },{
          hallazgo: "Lorem",
          descripcion: "ed faucibus egestas neque ac feugiat. ",
          notas: "",
          area: "Steinert",
          prioridad: "3",
          isActive: "1",
          status: 1,
          imgHallazgo: "antes",
          imgSolucion: null
        },{
          hallazgo: "Lorem",
          descripcion: "Adipisci, expedita beatae! Veritatis eligendi",
          notas: "Asperiores iure numquam quos ipsam earum aut est nemo laboriosam suscipit quas, quasi dese ",
          area: "Tiro 6",
          prioridad: "5",
          isActive: "0",
          status: 2,
          imgHallazgo: "antes",
          imgSolucion: "despues"
        },{
          hallazgo: "Lorem",
          descripcion: "Mauris semper tempus lacinia. Mauris eu ex ipsum.",
          notas: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At ",
          area: "Mantenimiento",
          prioridad: "5",
          isActive: "0",
          status: 2,
          imgHallazgo: "antes",
          imgSolucion: "despues"
        }

      ]
      this.grid = [

        { 
          label: 'Hallazgo',
          key: 'hallazgo',
          title: 'hallazgo',
        },{ 
          label: 'Descripcion',
          key: 'descripcion',
          title: 'descripcion',
        },{ 
          label: 'Area',
          key: 'area',
          title: 'area',
        },{ 
          label: 'Prioridad',
          key: 'prioridad',
          title: 'prioridad',
        },{ 
          label: 'Status',
          key: 'isActive',
          title: 'status',
        },
      ]
  }

  async getHallazgos() {
    return new Promise(resolve => {
      let data = [...this.hallazgos]
      resolve(data)
    })

  }
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async getCargaStructure() {
    return new Promise(resolve => {
      let id = this.getRandomArbitrary(100000000,999999999)
      let json = {
        inputs: [{
          title: "Id Camion",
          value: id,
          type: 0,
          id: "id"
        },{
          title: "Tipo de Material",
          value: "",
          status: 0,
          type: 2,
          id: "material"

        },{
          title: "Peso al Entrar",
          value: "0",
          status: 0,
          type: 1,
          id: "pesoE"
        },{
          title: "Peso al Salir",
          value: "0",
          status: 1,
          type: 1,
          id: "pesoS"
        },{
          title: "Peso Neto",
          value: "0",
          status: 1,
          type: 0,
          id: "pesoN"
      }],
        statusCarga: 0,
      }

      resolve(json)
    })
  }

  async getHallazgoStructure() {
    return new Promise(resolve => {
      let data = {
        hallazgo: "",
        descripcion: "",
        notas: "",
        area: "",
        prioridad: "",
        isActive: "1",
        status: 0,
        imgHallazgo: null,
        imgSolucion: null
      }
      resolve(data)
    })

  }

  async getHallazgosGrid() {
    return new Promise(resolve => {
      let data = [...this.grid]
      resolve(data)
    })
  }


}

// export{ FakeServer} 
module.exports = new FakeServer();

    // "start": "cross-env GENERATE_SOURCEMAP=false react-scripts build",
