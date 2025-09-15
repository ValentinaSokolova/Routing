import { Link, useSearchParams } from "react-router-dom"
import { PLAYLISTS } from "../../data"
import "./PlaylistsPage.css"
import { ChangeEvent } from "react";

export const PlaylistsPage = () => {
    const correctPlaylists = PLAYLISTS.filter(playlist => playlist.genre !== "Non Music");

    const [searchParam, setSearchParam] = useSearchParams();

    const handleSearchName = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setSearchParam(prev => {
        const newParams = new URLSearchParams(prev);
        if (value) {
            newParams.set("searchName", value.toLowerCase());
        } else {
            newParams.delete("searchName");
        }
        return newParams;
    });
    };

    const handleSearchGenre = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setSearchParam(prev => {
        const newParams = new URLSearchParams(prev);
        if (value) {
            newParams.set("searchGenre", value.toLowerCase());
        } else {
            newParams.delete("searchGenre");
        }
        return newParams;
    });
    }

    const searchName = searchParam.get("searchName") || "";
    const searchGenre = searchParam.get("searchGenre") || "";

    const filteredPlaylists = correctPlaylists.filter(({ name, genre }) => {
        const matchesName = searchName ? name.toLowerCase().includes(searchName) : true;
        const matchesGenre = searchGenre ? genre.toLowerCase().includes(searchGenre) : true;

        return matchesName && matchesGenre;
    });

    return <div className="playlistsPage">
        <h2>PlaylistsPage</h2>

        <div className="playlists">
            <label>
                введите название{" "}
                <input type="text" value={searchName} onChange={handleSearchName} />
            </label>
            <label>
                введите жанр{" "}
                <input type="text" value={searchGenre} onChange={handleSearchGenre} />
            </label>

            {filteredPlaylists.map(({ id, name }) => (
                <Link to={`/playlists/${id}`} key={id}>
                    {name}
                </Link>
            ))}
        </div>
    </div>
}