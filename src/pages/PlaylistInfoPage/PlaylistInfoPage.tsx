import { Link, useParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import './PlaylistInfoPage.css'

export const PlaylistsInfoPage = () => {
    const { playlistId } = useParams();
    const playlist = PLAYLISTS[Number(playlistId)];
    if (!playlist || playlist.genre === "Non Music") {
        return (
            <div className="playlistInfoPage">
                <h2>PlaylistInfoPage</h2>

                <div className="playlists">
                    <p>плейлиста таким playlistId нет</p>
                </div>
            </div>
        );
    }

    return (
        <div className="playlistInfoPage">
            <h2>PlaylistInfoPage</h2>

            <div className="playlists">
                <p>Жанр: {<Link to={`/playlists/?searchGenre=${playlist.genre.toLowerCase()}`} key={playlist.id}>
                                        {playlist.genre}
                                    </Link>}</p>
                <p>Название: {playlist.name}</p>
                <ul className="playlists__song-list">
                    {playlist.songs.map((song) => {
                        return (<li className="playlists__song-item">
                            {song}
                        </li>)
                    })}
                </ul>
            </div>
        </div>
    );
}