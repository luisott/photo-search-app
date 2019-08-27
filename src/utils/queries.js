export async function getImages(searchTerm = "", page, maxResults)
{
    const response = await fetch(`/search?query=${searchTerm}`);
    const json = await response.json();
    return json.photos;
}

export async function getImageStatistics(id)
{
    const response = await fetch(`/stats/${id}/statistics`);
    const json = await response.json();
    return json;
}