class PlansController < ApplicationController
    def index
        plans = Plan.all
        render json: plans, only: [:name, :duration, :start_time]
    end

    def show
        plan = Plan.find_by(id: params[:id])
        if plan
            render json: plan.slice(:name, :duration, :start_time)
        else
            render json: { message: 'Plan not found' }
        end
    end
end