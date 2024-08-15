import Head from 'next/head';
import styles from '../styles/Home.module.css';  // 确保导入样式

export default function Home({ dinosaurs }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dinosaur Gallery</title>
        <meta name="description" content="Explore various dinosaur species from different periods" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>欢迎来到肘子大家族！</h1>
        <p className={styles.description}>呀嘞呀嘞，不听话的肘肘</p>

        <div className={styles.grid}>
          {dinosaurs.map((dino, index) => (
            <div key={index} className={styles.card}>
              <h2>{dino.name}</h2>
              <p><strong>Period:</strong> {dino.period}</p>
              <p>{dino.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/data.json');
  const dinosaurs = await res.json();

  return {
    props: {
      dinosaurs,
    },
  };
}
