const dateformate = (d) => {
    const date = new Date(d);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date?.toLocaleDateString('en-US', options);
    return formattedDate
}

export default dateformate
