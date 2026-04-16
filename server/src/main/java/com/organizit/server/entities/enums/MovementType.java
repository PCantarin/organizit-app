package com.organizit.server.entities.enums;

public enum MovementType {

	ITEM_REMOVED("Removed"),
	ITEM_INSERTED("Isserted");
	
	private String descricao;
	
	private MovementType(String descricao) {
		this.descricao = descricao;
	}
	
	public String getDescricao() {
		return descricao;
	}
	
}
