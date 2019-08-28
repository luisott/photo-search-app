export async function getImages(searchTerm = "", maxResults = 20, page = 0)
{
    const response = await fetch(`/search?query=${searchTerm}&page=${page}&per_page=${maxResults}`);
    const json = await response.json();
    return json.photos;
}

export async function getImageStatistics(id)
{
    const response = await fetch(`/stats/${id}/statistics`);
    const json = await response.json();
    return json;
}