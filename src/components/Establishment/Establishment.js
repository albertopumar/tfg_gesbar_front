import React from "react";

class Establishment extends React.Component {

    nameRef = React.createRef();
    descriptionRef = React.createRef();

    processForm = (event) => {
        event.preventDefault();

        // TODO: create helper
        const credentials = JSON.parse(sessionStorage.getItem('credentials'));
        const token = credentials.data.access_token;

        const data = {
            name: this.nameRef.value.value,
            description: this.descriptionRef.value.value
        };

        //TODO: handle error
        fetch(`http://localhost:7777/api/V1/owner/establishment/${this.props.id ? this.props.id : ''}`, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: this.props.id ? 'PUT' : 'POST',
        })
            .then(response => response.json())
            .then(res => console.log(res));
    };

    //TODO: Delete from state
    deleteEstablishment = (event) => {
        event.preventDefault();

        // TODO: create helper
        const credentials = JSON.parse(sessionStorage.getItem('credentials'));
        const token = credentials.data.access_token;

        fetch(`http://localhost:7777/api/V1/owner/establishment/${this.props.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(res => console.log(res));
    };

    viewMenu = (event) => {
        event.preventDefault();
    };

    render() {
        return (
            <form className="establishment" onSubmit={this.processForm}>
                <input type="text" placeholder="Nombre" ref={this.nameRef} defaultValue={this.props.name}/>
                <input type="text" placeholder="Descripción" ref={this.descriptionRef} defaultValue={this.props.description} />

                <button type="submit">Guardar</button>

                {
                    // TODO: Eliminar y ver menú
                }
                <button onClick={this.deleteEstablishment}>Eliminar</button>
                <button onClick={this.viewMenu}>Ver menú</button>
            </form>
        )
    }
}

export default Establishment;