import sourceImg from './style/images/triangletwo-right.svg'
import targetImg from './style/images/spaceshiptwo-right.svg'
let count = 0;
export default function Cell({value, color, isSource, isTarget, ...rest}){
    // let value  = {rest}
    // console.log(count++)
    
    if(isSource){
        // console.log('source is here')
        return (<div className='cell' style={{'backgroundColor':color, "backgroundImage": `url(${sourceImg})`}} 
        {...rest}>{value!=undefined?value:''}</div>)
    }
    if(isTarget){
        // console.log('source is here')
        return (<div className='cell' style={{'backgroundColor':color, "backgroundImage": `url(${targetImg})`}} 
        {...rest}>{value!=undefined?value:''}</div>)
    }
    return (<div className='cell' style={{'backgroundColor':color}} {...rest}>{value!=undefined?value:''}</div>)
}