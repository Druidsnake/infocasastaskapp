export const formatDate = (date: any) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    // Extraemos el día de la semana, el día y el mes
    const [weekday, day, month] = formattedDate.split(" ");

    // Retornamos el formato deseado
    return `${weekday} ${month} ${day}`.replaceAll(",", "");
};
