import axios from "axios";

const user = 'admin';
const pass = 'admin';

export const getInfo = (tableInput, valueInput) => {
    let value = valueInput.toLowerCase().trim();
    let table = tableInput.toLowerCase().trim();

    return axios.get(`http://bogoville.xyz/rest/${table}/${value}`, {
            auth: {
                username: user,
                password: pass
            }
        },
    )

        .then((res) =>

            res.data
        )
        .catch(function (error) {
            console.log(error);
        });

};
export const getAllInfo = (tableInput) => {

    let table = tableInput.toLowerCase().trim();

    return axios.get(`http://bogoville.xyz/rest/${table}`, {
            auth: {
                username: user,
                password: pass
            }
        },
    )

        .then((res) =>

            res.data
        )
        .catch(function (error) {
            console.log(error);
        });

};

