import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

function SongPlayer(props) {
  const audioRef = useRef();
  return (
    <section className="player">
      <h1>Music player</h1>
      <img
        className="cover"
        width="250"
        height="250"
        src={props.song.coverUrl}
        alt="Song cover"
      />
      <div classname="buttons">
        <button onClick={() => audioRef.current.play()}> Play </button>
        <button onClick={() => audioRef.current.pause()}> Pause </button>
      </div>
      <audio ref={audioRef} key={props.song.audioUrl}>
        <source src={props.song.audioUrl}></source>
      </audio>
    </section>
  );
}

function SongListItem(props) {
  return (
    <li
      className={`song-list-item ${props.isCurrent ? "selected" : ""}`}
      style={{ background: props.isCurrent ? "darkslategrey" : "" }}
      onClick={() => props.onSelectSong(props.song.audioUrl)}
    >
      {props.song.title} by {props.song.artist}
    </li>
  );
}

export default function App() {
  const URL = "https://examples.devmastery.pl/songs-api/songs";
  const [songs, setSongs] = useState([]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];

  function selectSong(selectedSongUrl) {
    const audioIndex = songs.findIndex(
      (song) => song.audioUrl === selectedSongUrl
    );
    if (audioIndex >= 0) {
      setCurrentSongIndex(audioIndex);
    }
  }
  useEffect(() => {
    fetch(URL).then((response) => response.json().then(setSongs));
  }, []);
  return (
    <div className="App">
      {songs.length > 0 ? (
        <>
          <SongPlayer song={currentSong} />
          <section className="songs">
            <h2>Songs</h2>
            <ul className="song-list">
              {songs.map((song) => (
                <SongListItem
                  key={song.audioUrl}
                  song={song}
                  isCurrent={song.audioUrl === currentSong.audioUrl}
                  onSelectSong={selectSong}
                />
              ))}
            </ul>
          </section>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
