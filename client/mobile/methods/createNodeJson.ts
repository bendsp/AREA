const createNodeJson = (
  userId: string,
  actionName: string,
  trigger: TriggerProps,
  reactions: Array<ReactionProps>,
) => {
  const triggerBody: {[key: string]: string} = {};
  if (trigger.paramValues && Array.isArray(trigger.paramValues)) {
    trigger.paramValues.forEach(param => {
      triggerBody[param.name] = param.value;
    });
  }

  let nodeJson = {
    user_id: userId,
    area_name: actionName,
    action: {
      serviceName: trigger.service,
      body: triggerBody,
    },
    reaction: reactions.map(reaction => {
      const body: {[key: string]: string} = {};
      if (reaction.paramValues && Array.isArray(reaction.paramValues)) {
        reaction.paramValues.forEach(param => {
          body[param.name] = param.value;
        });
      }
      return {
        serviceName: reaction.service,
        body: body,
      };
    }),
  };
  console.log('action arg:', nodeJson.action);
  console.log('reaction arg:', nodeJson.reaction);
  return nodeJson;
};

export default createNodeJson;
