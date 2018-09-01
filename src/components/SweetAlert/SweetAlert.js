import React from "react";
import swal from 'sweetalert';

class SweetAlert extends React.Component {


    delete = (event) => {
        event.preventDefault();

        swal({
            title: "¿Desea eliminar el elemento?",
            text: "Haga click en Ok para eliminar la información",
            icon: "warning",
            buttons: ["Cancelar", "Ok"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.props.action(this.props.delete);
                swal("¡Información eliminada!", {
                    icon: "success",
                });
            } else {
                swal("¡La información sigue a salvo!");
            }
        })
    };


    render() {
        return (
            <button disabled={this.props.disabled} className={`btn btn-danger sweet-alert ${this.props.classes}`} onClick={this.delete}>
                {this.props.buttonName}
            </button>
        )
    }
}

export default SweetAlert;