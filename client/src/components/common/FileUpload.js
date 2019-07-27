import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [{ name: '' }]
    };
  }

  submitFile = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    this.props.uploadFile(formData, this.props.title);
  };

  handleFileUpload = event => {
    this.setState({ file: event.target.files });
    this.submitFile(event);
  };

  returnUpload() {
    switch (this.props.uploaded) {
      case null:
        return '';
      case false:
        return '';
      default:
        this.props.onUpload(this.props.uploaded.Location);
        return;
    }
  }

  render() {
    return (
      <div style={{ padding: '12px' }}>
        {this.returnUpload()}
        <form style={{ padding: '10px', borderTop: '1px solid #f2f2f2' }}>
          <div className="form-group" style={{ margin: '0' }}>
            <input
              type="file"
              className="form-control-file"
              onChange={this.handleFileUpload}
              style={{ border: '1px solid #f2f2f2', padding: '4PX' }}
            />
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ uploaded }) {
  return { uploaded };
}

export default connect(
  mapStateToProps,
  actions
)(FileUpload);
