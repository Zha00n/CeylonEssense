import { title } from 'process';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const showAlert = (type, title, text) => {
  return MySwal.fire({
    title,
    text,
    icon: type,
    customClass: {
      confirmButton: 'btn btn-primary',
    },
    buttonsStyling: false,
  });
};

const handleConfirmText = () => {
  return MySwal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ms-1',
    },
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      return MySwal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        customClass: {
          confirmButton: 'btn btn-success',
        },
      });
    }
    return null; 
  });
};

export const alertTypes = {
  success: (text) => showAlert('success', 'Good job!', text),
  info: (title, text) => showAlert('info', title, text),
  warning: (title, text) => showAlert('warning', title , text),
  error: (text) => showAlert('error', 'Error!', text),
  question: (text) => showAlert('question', 'Question?', text),
  confirmText: () => handleConfirmText(),
};
