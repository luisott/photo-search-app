export async function getImages(searchTerm = "", page, maxResults)
{
    const response = await fetch(`/photos?query=${searchTerm}`);
    const json = await response.json();
    return json;
}