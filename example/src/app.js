import React from 'react'
import {render} from 'react-dom'
import {ReactDemo, TableImage} from '../../src'


const image = ['https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2582428806.jpg', 'https://img9.doubanio.com/view/puppy_image/raw/public/16ad990ec23uwn790d4.jpg']
const App = () => <div>
    <ReactDemo/>

    <TableImage value={image}></TableImage>

</div>


render(<App/>, document.getElementById('root'))