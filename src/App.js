import logo from './logo.svg';
import './App.css';
import { dividerClasses } from '@mui/material';

import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from "react";

import { Button } from 'primereact/button';
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import QRCode from "qrcode";
import { Card } from 'primereact/card';

function App() {

  const [query,setQuery]=useState("");
 const [qrUrl,setQrUrl]=useState("");
  const generateQr=async()=>{
    try {
      const dataUrl=await QRCode.toDataURL(query);
      setQrUrl(dataUrl);
    } catch (error) {
      console.log(error)
    }
  }
  const downloadQr=async()=>{
    try {
      const link=document.createElement('a')
      link.href=qrUrl;
      link.download=encodeURIComponent('qr-code');
      link.style.display="none";

      link.click();
      document.body.removeChild(link);
    } catch (error) {
     console.log(error) 
    }
  }
  return (
    <div className='App'>
      <h1>qr code generator</h1>

        <div className="card flex justify-content-center">
            <InputTextarea autoResize value={query} onChange={(e) => setQuery(e.target.value)} rows={5} cols={30} />
            <br/>
            <Button label="generate qr code" onClick={generateQr} />
            {
              qrUrl.length>0 ? (
                <Card title="QR-Code" style={{width:'fit-content',margin:'10vh auto',minWidth:'20vw'}}>
                  <img src={qrUrl} alt="qr-code" width={200}/>
                  <br/>
                  <Button label="Download" onClick={downloadQr} />
                </Card>
              ):""
            }
        </div>
    </div>
  );
}

export default App;
