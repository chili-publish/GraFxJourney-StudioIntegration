const createEnvironmentBaseURL = ({type="sandbox", environment="ft-nostress"} = {type: "sandbox", environment: "ft-nostress"}, version='1') => {
  const host = (type=="sandbox") ? "chili-publish-sandbox" : "chili-publish"
  return `https://${environment}.${host}.online/grafx/api/${version}/environment/${environment}`;
}

export { createEnvironmentBaseURL };