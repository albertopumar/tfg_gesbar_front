import React from "react";
import swal from 'sweetalert';

class SweetAlert extends React.Component {


    delete = () => {
        swal({
            title: "Are you sure?",
            text: "Click ok to show the success alert",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.props.action(this.props.delete);
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
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