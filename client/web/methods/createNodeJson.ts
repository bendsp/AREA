import { TriggerProps } from "../interfaces/triggers";
import { ReactionProps } from "../interfaces/reactions";

const createNodeJson = (actionName: string, trigger: TriggerProps, reactions: Array<ReactionProps>) => {
    const triggerBody: { [key: string]: string } = {};
    trigger.paramValues.forEach(param => {
        triggerBody[param.name] = param.value;
    });

    let nodeJson = {
        user_id: 1,
        area_name: actionName,
        action: {
            serviceName: trigger.service,
            body: triggerBody
        },
        reaction: reactions.map((reaction) => {
            const body: { [key: string]: string } = {};
            reaction.paramValues.forEach(param => {
                body[param.name] = param.value;
            });
            return {
                serviceName: reaction.service,
                body: body
            };
        })
    }
    return nodeJson
}

export default createNodeJson
