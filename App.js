import React, {Component} from 'react';  
  import './App.css';  
	  
  class App extends Component{
    constructor(){
      super();
      this.state = {
        //BMI
          berat  : null,
          tinggi : null,
          hasil  : null,
        //CBNK
          nominal:null,
          bungan :null,
          periode:null,
        //HHA
          hargaA:null,
          ppn:null,
          diskon:null,
        //KB
          bilangan:null,
          nilai:null,
          konversi:null
      }
    }

//Handel Submit berfungsi untuk memproses perhitungan kalkulator,
    SubmitBmi(e){//untuk perhitungan bmi
    e.preventDefault();
    //UNTUK BMI
      //pengambilan data input
      let tinggi=parseInt(this.refs.tinggi.value)
      let berat =parseInt(this.refs.berat.value)
      //perhitungan
      tinggi=tinggi/100
        let bmi = berat / tinggi**2
        var kategori
        if(bmi < 18.5){
            kategori="kekurangan berat badan"
        }else if(bmi >= 18.5 && bmi <=24.9){
            kategori="normal"
        }else if(bmi >= 25.0 && bmi <= 29.9){
            kategori="kelebihan berat badan"
        }else if(bmi >= 30.0){
            kategori="kegemukan"
        }else{
            kategori=""
        } 
        this.setState({kategori});
        //mengosongkan input setelah di isi
        this.refs.tinggi.value=null;
        this.refs.berat.value=null;
    }
    SubmitCbnk(e){//untuk perhitungan cicilan bank
      e.preventDefault();
        //pengambilan data input bank
        let nominal=parseInt(this.refs.nominal.value)
        let bunga = parseInt(this.refs.bunga.value)
        let periode = parseInt(this.refs.peroide.value)
        //perhitungan
        let cicilan = nominal/periode
        let Bunga =(nominal*(bunga/100))/periode
        var angsuran=cicilan+Bunga
        this.setState({angsuran});
        //mengosongkan input setelah di isi
        this.refs.nominal.value=null;
        this.refs.bunga.value=null;
      }
    SubmitHha(e){//untuk perhitungan harga akhir
      e.preventDefault();
      //mengambil dta dari input
      let hargaA = parseInt(this.refs.hargaA.value)
      let ppn = parseInt(this.refs.ppn.value)
      let diskon = parseInt(this.refs.diskon.value)
      //rumus
      let t1=hargaA*diskon/100
      let t2=hargaA*ppn/100
      var ha=hargaA-(t1-t2)
      this.setState({ha});
      //kosongkan input setelah di isi
      this.refs.hargaA.value=null;
      this.refs.ppn.value=null;
      this.refs.diskon.value=null;
    }
    Submitkb(e){//untuk perhitungan konversi perhitungan
      e.preventDefault();
      //mengambil data dari input
      let bilangan=(this.refs.bilangan.value)
      var nilai=parseInt(this.refs.nilai.value)
      var konversi=(this.refs.konversi.value)
      //pemilihan dan rumus
      var hasil
      switch(bilangan){
        case "Biner":
            if(konversi === "Biner"){
              hasil=nilai;
            }else if(konversi === "Desimal"){
              hasil = parseInt(nilai, 2)
            }else if(konversi === "Oktal"){
              let dec = parseInt(nilai, 2)
              hasil = (dec).toString(8)
            }else if(konversi === "Hexsadesimal"){
              let dec = parseInt(nilai, 2)
              hasil = (dec).toString(16).toUpperCase()
            }else{
              hasil="eror"
            }
          break;
        case "Desimal":
          if(konversi === "Biner"){
            hasil = nilai.toString(2);
          }else if(konversi === "Desimal"){
            hasil = nilai;
          }else if(konversi === "Oktal"){
            hasil = nilai.toString(8);
          }else if(konversi === "Hexsadesimal"){
            hasil = nilai.toString(16).toUpperCase();
          }else{
            hasil="eror"
          }
          break;
        case "Oktal":
          if(konversi === "Biner"){
            let dec = parseInt(nilai, 8);
            hasil = (dec).toString(2);
          }else if(konversi === "Desimal"){
            hasil = parseInt(nilai, 8);
          }else if(konversi === "Oktal"){
            hasil = nilai;
          }else if(konversi === "Hexsadesimal"){
            let dec = parseInt(nilai, 8);
            hasil = (dec).toString(16).toUpperCase();
          }else{
            hasil="eror"
          }
          break;
        case "Hexsadesimal":
          if(konversi === "Biner"){
            let dec = parseInt(nilai, 16);
            hasil = (dec).toString(2);
          }else if(konversi === "Desimal"){
            hasil = parseInt(nilai, 16);
          }else if(konversi === "Oktal"){
            let dec = parseInt(nilai, 16);
            hasil = (dec).toString(8).toUpperCase();
          }else if(konversi === "Hexsadesimal"){
            hasil=nilai;
          }else{
            hasil="eror"
          }
          break;
      }
      this.setState({hasil});
      this.refs.nilai.value = null;
    }
//Render untuk menampilkan hasil
    renderBmi(){//menampilkan hasil perhitungan bmi
      const{kategori}=this.state;
      //cek data
      if(this.state.kategori)
        return(
          <p className="alert alert-success">
            {kategori}
          </p>
        );
    }
    renderCbnk(){//menampilkan hasil perhitungan cicilan bank
      const{angsuran}=this.state;
      //cek data
      if(this.state.angsuran)
      return(
        <p className="alert alert-success">
          {"Rp."+angsuran+",00"}
        </p>
      );
    }
    renderHha(){//menampilkan hasil perhitungan hitungan harga akhir
      const{ha}=this.state;
      if(this.state.ha)
      return(
        <p className="alert alert-success">
          {"Rp."+ha+",00"}
        </p>
      );
    }
    renderKb(){//menampilkan hasil perhitungan konversi bilangan
      const{hasil}=this.state;
      if(this.state.hasil)
      return(
        <p className="alert alert-success">
          {hasil}
        </p>
      );
    }
//(method bawaan React JS), berfungsi untuk merender DOM pada browser
    render(){
      return(
        <div>
          <div className="col-md-3 shadow p-3 mb-5 bg-white rounded bg-secondary" id="bmi">
            <form onSubmit={this.SubmitBmi.bind(this)}>
              <h3>Body Mass Index</h3>
              <hr></hr>
              <label>Berat :</label>
              <input type="text" ref="berat"  className="form-control"></input>
              <label>Tinggi :</label>
              <input type="text" ref="tinggi" className="form-control"></input>
              <br></br>
              <button className="btn btn-outline-primary btn-block">KETERANGAN</button>
              <hr></hr>
              {this.renderBmi()}
            </form>
          </div>
          <div className="col-md-3 shadow p-3 mb-5 bg-white rounded" id="cbnk" >
            <form onSubmit={this.SubmitCbnk.bind(this)}>
              <h3>Cicilan Bank</h3>
              <hr></hr>
              <label>Nominal</label>
              <input type="text" ref="nominal" className="form-control"></input>
              <label>Bunga</label>
              <input type="text" ref="bunga" className="form-control"></input>
              <label>Periode(bulan)</label>
              <select ref="peroide" className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                <br></br>
                <button className="btn btn-outline-primary btn-block">HITUNG</button>
                <hr></hr>
                  {this.renderCbnk()}
            </form>
          </div>
          <div className="col-md-3 shadow p-3 mb-5 bg-white rounded" id="hha">
            <form onSubmit={this.SubmitHha.bind(this)}>
              <h3>Hitung Harga Akhir</h3>
              <hr></hr>
              <label>Harga Awal</label>
              <input type="text" ref="hargaA" className="form-control"></input>
              <label>PPN</label>
              <input type="text" ref="ppn" className="form-control"></input>
              <label>Diskon</label>
              <input type="text" ref="diskon" className="form-control"></input>
              <br></br>
              <button className="btn btn-outline-primary btn-block">HITUNG</button>
              <hr></hr>
                {this.renderHha()}
            </form>
          </div>
          <div className="col-md-3 shadow p-3 mb-5 bg-white rounded" id="kb">
            <form onSubmit={this.Submitkb.bind(this)}>
              <h3>Konversi Bilangan</h3>
              <hr></hr>
              <label>Pilih bilangan</label>
              <select ref="bilangan" className="form-control">
               <option>Biner</option>
               <option>Oktal</option>
               <option>Desimal</option>
               <option>Hexsadesimal</option>
              </select>
              <label>Masukan Nilai</label>
              <input type="text" ref="nilai" className="form-control"></input>
              <label>Pilih Konversi</label>
              <select ref="konversi" className="form-control">
                <option>Biner</option>
                <option>Oktal</option>
                <option>Desimal</option>
                <option>Hexsadesimal</option>
              </select>
              <br></br>
              <button className="btn btn-outline-primary btn-block">Convert</button>
              <hr></hr>
              {this.renderKb()}
            </form>
          </div>
        </div>
      );
    }
  }
    
  export default App;
  

