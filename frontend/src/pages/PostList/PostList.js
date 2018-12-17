import React, { PureComponent } from 'react'

import DefaultContainer from '../../components/shared/DefaultContainer';
import axios from '../../services/AxiosInstance';

class PostList extends PureComponent {

  async componentDidMount() {
    const payload = await axios.get('http://localhost:3001/posts');
    console.log('GET: ', payload);
  }

  render() {
    return (
      <DefaultContainer>
        <div>Pagina principal</div>
      </DefaultContainer>
    )
  }
}

export default PostList
