import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import "./App.css";
import { FaTelegramPlane } from "react-icons/fa";
import { CiPill } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

function App() {
  const [selectedItems, setSelectedItems] = useState({
    bigas: null,
    glasses: null,
    hair: null,
    background: "/img/background/1.png", // Valor padrão inicial
  });
  const [tokenName, setTokenName] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [tokenCA, setTokenCA] = useState("");
  const [pumpLink, setPumpLink] = useState("");

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch("https://apitoreturnca.onrender.com/api/purchaseData", {
      headers: {
        "x-access-key":
          "A1qQaAA9kdfnn4Mmn44bpoieIYHKkdghFKUD1978563llakLLLKdfslphgarcorc3haeogmmMNn243wf",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTokenName(data.tokenName);
        setTelegramLink(data.telegramLink);
        setTwitterLink(data.twitterLink);
        setTokenCA(data.tokenCA);
        setPumpLink(data.link);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(tokenName);
  console.log(telegramLink);
  console.log(twitterLink);
  console.log(tokenCA);
  console.log(pumpLink);
  const items = {
    bigas: [
      "/img/bigas/1.png",
      "/img/bigas/2.png",
      "/img/bigas/3.png",
      "/img/bigas/4.png",
    ],
    glasses: [
      "/img/glasses/1.png",
      "/img/glasses/2.png",
      "/img/glasses/3.png",
      "/img/glasses/4.png",
    ],
    hair: [
      "/img/hair/1.png",
      "/img/hair/2.png",
      "/img/hair/3.png",
      "/img/hair/4.png",
    ],
    background: [
      "/img/background/1.png",
      "/img/background/2.png",
      "/img/background/3.png",
      "/img/background/4.png",
    ],
  };

  // Atualiza o item selecionado
  const updateSelectedItem = (category, item) => {
    setSelectedItems((prev) => ({ ...prev, [category]: item }));
  };

  // Função para resetar as escolhas
  const resetSelections = () => {
    setSelectedItems({
      bigas: null,
      glasses: null,
      hair: null,
      background: "/img/background/1.png", // Reset para valores padrão
    });
  };

  // Função para gerar escolhas aleatórias
  const randomizeSelections = () => {
    const randomSelections = Object.keys(items).reduce((acc, category) => {
      const randomItem =
        items[category][Math.floor(Math.random() * items[category].length)];
      acc[category] = randomItem;
      return acc;
    }, {});
    setSelectedItems(randomSelections);
  };

  // Função para fazer o download da imagem
  const downloadImage = () => {
    const playerCard = document.querySelector(".player-card"); // Seleciona a área da imagem
    html2canvas(playerCard).then((canvas) => {
      const link = document.createElement("a");
      link.download = "chill-guy.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };
  let text = "FaaATGZFZSJWS6MF5jKMhzgecnCuAS7LoVVDNtU7GCJ5"
  const shortText = `${text.slice(0, 3)}...${text.slice(-3)}`; // Formato abreviado
  const copyToClipboard = () => {
    const text = `${tokenCA}`;
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log("copy " + text)
      })
      .catch((err) => {
        console.error("Erro ao copiar texto: ", err);
      });
  };

  return (
    <div className="app">
      <div className="icons">
        <div className="item-social">
          <div className="ca">
            <button onClick={copyToClipboard}>ca: {shortText}</button>
          </div>
        </div>
        <div className="item-social">
          <a href={pumpLink}>
            <CiPill />
            pump.fun
          </a>
        </div>
        <div className="item-social">
          <a href={telegramLink}>
            <FaTelegramPlane />
            telegram
          </a>
        </div>
        <div className="item-social">
          <a href={twitterLink}>
            <FaXTwitter />
            twitter
          </a>
        </div>
      </div>
      <div className="select-card">
        {Object.entries(items).map(([category, images]) =>
          images.map((imagePath, key) => (
            <button
              className="item"
              key={`${category}-${key}`}
              onClick={() => updateSelectedItem(category, imagePath)}
            >
              <img src={imagePath} alt={category} />
            </button>
          ))
        )}
      </div>
      <div className="player-card">
        <div className="card-header">
          <img src="/badge.png" alt="" />
          <div className="member-badge">
            <h1>{tokenName || "k1ngey 🏳️‍🌈"}</h1>
          </div>
          <div className="close-button">
            <img src="/info.png" alt="" />
          </div>
        </div>
        <div
          className="player-image"
          style={{
            backgroundImage: `url(${selectedItems.background})`, // Atualiza o background dinamicamente
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="attachs">
            <div className="bigas">
              <img
                src={selectedItems.bigas || "/img/bigas/2.png"}
                alt="Bigas"
              />
            </div>
            <div className="glasses">
              <img
                src={selectedItems.glasses || "/img/glasses/1.png"}
                alt="Glasses"
              />
            </div>
            <div className="hair">
              <img src={selectedItems.hair || "/img/hair/1.png"} alt="Hair" />
            </div>
          </div>
          <div className="chillguy">
            <img src="/chillguy.png" alt="Penguin Character" />
          </div>
        </div>
        <div className="buttons">
          <button className="reset" onClick={resetSelections}>
            Reset
          </button>
          <button className="mystery-button" onClick={downloadImage}>
            Download Image
          </button>
          <button className="jelly-button" onClick={randomizeSelections}>
            Random Chill Guy
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
