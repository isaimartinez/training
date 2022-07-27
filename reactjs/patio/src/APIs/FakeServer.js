
class FakeServer {

  constructor(dispatch){
      this.dispatch = dispatch
      this.cajones = [
        {
          id: "A1",
          statusTorreta: 0,
          statusCajon: 0,
          capacidad: 1000,
          acumulado: 0,
          cargas: [],
        },{
          id: "B1",
          statusTorreta: 0,
          statusCajon: 0,
          capacidad: 1000,
          acumulado: 0,
          cargas: [],
        },{
          id: "C1",
          statusTorreta: 0,
          statusCajon: 0,
          capacidad: 1000,
          acumulado: 0,
          cargas: [],
        },{
          id: "A2",
          statusTorreta: 0,
          statusCajon: 0,
          capacidad: 1000,
          acumulado: 0,
          cargas: [],
        },{
          id: "B2",
          statusTorreta: 0,
          statusCajon: 0,
          capacidad: 1000,
          acumulado: 0,
          cargas: [],
        },{
          id: "C2",
          statusTorreta: 0,
          statusCajon: 0,
          capacidad: 1000,
          acumulado: 0,
          cargas: [],
        },
      ]
  }

  async getCajones() {
    return new Promise(resolve => {
      let data = [...this.cajones]
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

  getProducts(){
      return [{name:"Premium", price: "60MXN", productId: 12345}]
  }

  getPurchaseHistory(){
      return []
  }

}

module.exports = new FakeServer();