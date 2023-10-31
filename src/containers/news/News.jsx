import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Layout } from "../../layout/Layout";
import style from "./style_news.module.css";

const apiKey = "6a209fc13bf14467b5b601f352d365ce";
const urlTest =
  "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=6a209fc13bf14467b5b601f352d365ce";

export function News() {
  const [news, setNews] = useState({});

  useEffect(() => {
    fetch(urlTest)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Hubo algun error");
        }
        return res.json();
      })
      .then((data) => {
        setNews(data);
      });
  }, []);

  return (
    <main>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> Noticias... </title>
      </Helmet>
      <Layout>
        <h1 className={style.title}> NOTICIAS </h1>

        <section className={style.containerCategoryes}>
          <aside className={style.containerLinks}>
            <p className={style.Linkcategory}> Tecnologia </p>
            <p className={style.Linkcategory}> Ciencia </p>
            <p className={style.Linkcategory}> Entretenimiento </p>
            <p className={style.Linkcategory}> Deportes </p>
            <p className={style.Linkcategory}> Politica </p>
            <p className={style.Linkcategory}> Negocios </p>
          </aside>

          <aside className={style.containerSearch}>
            <form>
              <input type="text" required />
              <button type="submit">Buscar</button>
            </form>
          </aside>
        </section>

        <section className={style.containerNews}>
          {Object.keys(news).length !== 0
            ? news.articles?.map((index) => {
                return (
                  <div key={index.id} className={style.item}>
                    <h1 className={style.titleNews}>{index.title}</h1>
                    <img
                      className={style.img}
                      src={index.urlToImage}
                      alt="img"
                    />
                    <p className={style.date}>
                      {" "}
                      {index.publishedAt.split("T")[0]}{" "}
                    </p>
                  </div>
                );
              })
            : false}
        </section>
      </Layout>
    </main>
  );
}
