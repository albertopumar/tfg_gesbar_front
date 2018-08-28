import React from "react";
import swal from 'sweetalert';

class SweetAlert extends React.Component {


    delete = () => {
        swal({
            title: "¿Desea eliminar el elemento?",
            text: "Haga click en Ok para eliminar la información",
            icon: "warning",
            buttons: true,
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
            <div className={`btn btn-danger sweet-alert ${this.props.classes}`} onClick={this.delete}><span
                className='s'>{this.props.buttonName}</span></div>
        )
    }
}

export default SweetAlert;