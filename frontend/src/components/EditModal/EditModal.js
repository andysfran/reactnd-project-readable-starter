import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeModal } from './actions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditModal extends PureComponent {

  state = {
    title: "",
    text: ""
  }

  componentDidUpdate() {
    if (this.state.title === "" && this.state.text === "" && this.props.open) {
      this.setState({
        title: this.props.data.title,
        text: this.props.data.text
      });
    }
  }

  onCloseModal = () => {
    this.props.closeModal();
    this.setState({ title: "", text: "" });
  }

  render() {
    const { closeModal, open, onConfirm } = this.props;
    return (
      <Dialog
        open={open}
        onClose={this.onCloseModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            label=""
            fullWidth
            value={this.state.text}
            onChange={(e) => this.setState({ text: e.target.value })}
            multiline
            rows={5}
            rowsMax={10}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onConfirm(this.state.title, this.state.text)} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ closeModal }, dispatch);

const mapStateToProps = (state) => ({
  open: state.editModal.isOpen,
  data: state.editModal.data
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
