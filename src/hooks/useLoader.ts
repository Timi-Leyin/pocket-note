import { useState } from "react";

/**
 ** @params arg
    @type [error, data]
**/
type useLoaderT = Promise<[any, any]>

const useLoader =  (arg: useLoaderT) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError ] = useState("");
  const [state, setState] = useState<any>();

  arg.then((res)=>{
      const [err, data] = res;
      
    if(err) { 
        setError(err.message)
    }
    if(data){
        setError("")
        setState(data)
    }
    setIsLoading(false)
  })

  return {
      loading:isLoading,
      error,
      data:state
  }
};
export default useLoader;
