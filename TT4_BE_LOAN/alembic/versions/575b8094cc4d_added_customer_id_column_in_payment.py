"""added customer_id column in payment

Revision ID: 575b8094cc4d
Revises: 6186edfd5994
Create Date: 2022-03-25 14:05:26.133556

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '575b8094cc4d'
down_revision = '6186edfd5994'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('payments', sa.Column('customer_id', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('payments', 'customer_id')
    # ### end Alembic commands ###
