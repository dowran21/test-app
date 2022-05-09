const SchemaMiddleware = (schema) => { 
  return async (req, res, next) => { 
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error == null) { 
      next(); 
    } else { 
      const { details } = error;
      let resp = {};
      details.forEach(item => {
        resp[item.path[0]] = item.message
      });
      console.log(resp);
      res.status(422).json({ error: resp }) 
    } 
  }
};

const QuerySchemaMiddleware = (schema) => { 
  return async (req, res, next) => { 
    const { error } = schema.validate(req.query, { abortEarly: false });
    if (error == null) { 
      next(); 
    } else { 
      const { details } = error;
      let resp = [];
      details.forEach(item => {
        resp[item.path[0]] = item.message
      });
      console.log(resp);
      res.status(422).json({ error: resp }) 
    } 
  }
}; 

const ParamsSchemaMiddleware = (schema) => { 
  return async (req, res, next) => { 
    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error == null) { 
      next(); 
    } else { 
      const { details } = error;
      let resp = [];
      details.forEach(item => {
        resp[item.path[0]] = item.message
      });
      console.log(resp);
      res.status(422).json({ error: resp }) 
    } 
  }
};

module.exports = {
    SchemaMiddleware,
    QuerySchemaMiddleware,
    ParamsSchemaMiddleware
}