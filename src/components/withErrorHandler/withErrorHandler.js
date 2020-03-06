import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
      state = {
          error: null
        };

      reqInterceptor = axios.interceptors.request.use(
        req => {
          this.setState({error: null});
          return req;
        }
      );

      resInterceptor = axios.interceptors.response.use(
        res => res,
        error => this.setState({error})
      );

      // for multi-page, we use withErrorHandler many times, this may cause a lot of unuse withErrorHandler component in the memory,so it has to be deleted when it has no require anymore.
      componentWillUnmount () {
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
      }

      errorConfirmedHandler = () => this.setState({error: null});

      render() {
        return (
          <>
            <Modal
              show={this.state.error}
              modalClosed={this.errorConfirmedHandler}
            >
              {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
          </>
        );
      }
    }
  };
  export default withErrorHandler;