from .model1 import router as model1_r
from .model2 import router as model2_r

# Definir qué se exporta con `*`
__all__ = ["model1_r", "model2_r"]