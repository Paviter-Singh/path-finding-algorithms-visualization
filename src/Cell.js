export default function Cell({value, color, ...rest}){
    // let value  = {rest}
    
    return (<div className='cell' style={{'backgroundColor':color}} {...rest}>{value!=undefined?value:''}</div>)
}