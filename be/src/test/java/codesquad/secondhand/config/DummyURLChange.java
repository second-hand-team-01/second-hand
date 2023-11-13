package codesquad.secondhand.config;

import java.util.Random;

public class DummyURLChange {
	public void change() {
		String SQL = "'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/";
		String start = "INSERT INTO `second-hand`.`item_image` (`item_image_idx`, `item_idx`, `image_url`)\n"
			+ "VALUES ";

		Random random = new Random();
		StringBuilder sb = new StringBuilder();
		sb.append(start);
		for (int i = 0; i < 100; i++) {
			sb.append("(");
			sb.append(i + 1);
			sb.append(", ");
			sb.append(i + 1);
			sb.append(",");
			sb.append(SQL);
			sb.append(random.nextInt(10));
			sb.append(".jpg')");
			sb.append(",");
			sb.append("\n");
		}

		System.out.println(sb);
	}
}
