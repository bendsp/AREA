import { TriggerProps } from "../interfaces/triggers";
import { ReactionProps } from "../interfaces/reactions";

const createNodeJson = (userId: string, actionName: string, trigger: TriggerProps, reactions: Array<ReactionProps>) => {
    const triggerBody: { [key: string]: string } = {};
    trigger.paramValues.forEach(param => {
        triggerBody[param.name] = param.value;
    });
    let nodeJson = {
        user_id: userId,
        area_name: actionName,
        action: {
            serviceName: trigger.action,
            body: triggerBody
        },
        reaction: reactions.map((reaction) => {
            const body: { [key: string]: string } = {};
            reaction.paramValues.forEach(param => {
                body[param.name] = param.value;
            });
            return {
                serviceName: reaction.reaction,
                body: body
            };
        })
    }
    return nodeJson
}

export default createNodeJson
