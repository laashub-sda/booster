import { ReadModel, Projects } from '@boostercloud/framework-core'
import { ProjectionResult, UUID } from '@boostercloud/framework-types'
import { Cart } from '../entities/Cart'
import { CartItem } from "../common/CartItem";

@ReadModel({
  authorize: // Specify authorized roles here. Use 'all' to authorize anyone
})
export class CartWithProjectionReadModel {
  public constructor(
    public id: UUID,
    readonly items: Array<CartItem>,
  ) {}

  @Projects(Cart, "id")
  public static projectCart(entity: Cart, currentCartWithProjectionReadModel?: CartWithProjectionReadModel): ProjectionResult<CartWithProjectionReadModel> {
    return /* NEW CartWithProjectionReadModel HERE */
  }

}
