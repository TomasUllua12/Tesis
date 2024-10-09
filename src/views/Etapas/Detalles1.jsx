import React from 'react'
import "./Detalles1.css"
import { Navbar } from "../../components/Navbar";
import { Chat } from "../../components/Chat";
import { ImageButton } from "../../components/ImageButton";

export function Detalles1(props) {
  return (
    <div>
      <div className="color-line-etapa1"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <div className="general-main-encabezado"></div>
          <div className="main-capitulos">
            <ImageButton />
            <ImageButton />
          </div>
          <div className="general-main-pie"></div>
        </div>
        <Chat />
      </div>
    </div>
  )
}