import React from "react";
import "./Detalles1.css";
import { Navbar } from "../../components/Navbar";
import { Chat } from "../../components/Chat";
import { MainHeader } from "../../components/MainHeader";

export function Detalles1(props) {
  return (
    <div>
      <div className="color-line"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <MainHeader title="Detalles Módulo 1" />

          <div className="card-detalles"></div>
          <div className="general-main-pie"></div>
        </div>
        <Chat />
      </div>
    </div>
  );
}
