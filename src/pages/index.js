import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect, useRef } from 'react';

export default function Home({ dinosaurs }) {
  const [isPlaying, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // 自动播放音频
    audioRef.current.play();
    setPlaying(true);
  }, []);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

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
        <audio ref={audioRef} src="/song.m4a" loop />
        <div className={styles.albumContainer}>
        <img src="/album.jpg" className={`${styles.albumImage} ${isPlaying ? styles.rotatingAlbum : ''}`} alt="专辑封面"/>
        <button onClick={togglePlay} className={styles.playButton}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>

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

import { promises as fs } from 'fs';
import path from 'path';

export async function getStaticProps() {
  // 构建文件的路径
  const filePath = path.join(process.cwd(), 'public', 'data.json');
  // 读取文件内容
  const jsonData = await fs.readFile(filePath, 'utf8');
  // 解析JSON数据
  const dinosaurs = JSON.parse(jsonData);

  return {
    props: {
      dinosaurs,
    },
  };
}
